import Config from "../config";
import { SegmentUUID, SponsorTime } from "../types";
import { getSkippingText } from "../utils/categoryUtils";
import { AnimationUtils } from "../utils/animationUtils";
import { keybindToString } from "../../maze-utils/src/config";

export interface SkipButtonControlBarProps {
    skip: (segment: SponsorTime) => void;
    selectSegment: (UUID: SegmentUUID) => void;
    onMobileYouTube: boolean;
}

export class SkipButtonControlBar {

    container: HTMLElement;
    skipIcon: HTMLImageElement;
    textContainer: HTMLElement;
    chapterText: HTMLElement;
    segment: SponsorTime;

    showKeybindHint = true;
    onMobileYouTube: boolean;

    enabled = false;

    timeout: NodeJS.Timeout;
    duration = 0;

    skip: (segment: SponsorTime) => void;

    // Used if on mobile page
    hideButton: () => void;
    showButton: () => void;

    // Used by mobile only for swiping away
    left = 0;
    swipeStart = 0;

    constructor(props: SkipButtonControlBarProps) {
        this.skip = props.skip;
        this.onMobileYouTube = props.onMobileYouTube;

        this.container = document.createElement("div");
        this.container.classList.add("skipButtonControlBarContainer");
        this.container.classList.add("sbhidden");
        if (this.onMobileYouTube) this.container.classList.add("mobile");

        this.skipIcon = document.createElement("img");
        this.skipIcon.src = chrome.runtime.getURL("icons/skipIcon.svg");
        this.skipIcon.classList.add("ytp-button");
        this.skipIcon.id = "sbSkipIconControlBarImage";

        this.textContainer = document.createElement("div");

        this.container.appendChild(this.skipIcon);
        this.container.appendChild(this.textContainer);
        this.container.addEventListener("click", () => this.toggleSkip());
        this.container.addEventListener("mouseenter", () => {
            this.stopTimer();

            if (this.segment) {
                props.selectSegment(this.segment.UUID);
            }
        });
        this.container.addEventListener("mouseleave", () => {
            this.startTimer();

            props.selectSegment(null);
        });
        if (this.onMobileYouTube) {
            this.container.addEventListener("touchstart", (e) => this.handleTouchStart(e));
            this.container.addEventListener("touchmove", (e) => this.handleTouchMove(e));
            this.container.addEventListener("touchend", () => this.handleTouchEnd());
        }
    }

    getElement(): HTMLElement {
        return this.container;
    }

    attachToPage(): void {
        const mountingContainer = this.getMountingContainer();
        this.chapterText = document.querySelector(".ytp-chapter-container");

        if (mountingContainer && !mountingContainer.contains(this.container)) {
            if (this.onMobileYouTube) {
                mountingContainer.appendChild(this.container);
            } else {
                mountingContainer.insertBefore(this.container, this.chapterText);
            }

            if (!this.onMobileYouTube) {
                AnimationUtils.setupAutoHideAnimation(this.skipIcon, mountingContainer, false, false);
            } else {
                const { hide, show } = AnimationUtils.setupCustomHideAnimation(this.skipIcon, mountingContainer, false, false);
                this.hideButton = hide;
                this.showButton = show;
            }
        }
    }

    private getMountingContainer(): HTMLElement {
        if (!this.onMobileYouTube) {
            return document.querySelector(".ytp-left-controls");
        } else {
            return document.getElementById("player-container-id");
        }
    }

    enable(segment: SponsorTime, duration?: number): void {
        if (duration) this.duration = duration;
        this.segment = segment;
        this.enabled = true;

        this.refreshText();
        this.container?.classList?.remove("textDisabled");
        this.textContainer?.classList?.remove("sbhidden");
        AnimationUtils.disableAutoHideAnimation(this.skipIcon);

        this.startTimer();
    }

    refreshText(): void {
        if (this.segment) {
            this.chapterText?.classList?.add("sbhidden");
            this.container.classList.remove("sbhidden");
            this.textContainer.innerText = this.getTitle();
            this.skipIcon.setAttribute("title", this.getTitle());
        }
    }

    setShowKeybindHint(show: boolean): void {
        this.showKeybindHint = show;

        this.refreshText();
    }

    stopTimer(): void {
        if (this.timeout) clearTimeout(this.timeout);
    }

    startTimer(): void {
        this.stopTimer();
        this.timeout = setTimeout(() => this.disableText(), Math.max(Config.config.skipNoticeDuration, this.duration) * 1000);
    }

    disable(): void {
        this.container.classList.add("sbhidden");

        this.chapterText?.classList?.remove("sbhidden");
        this.getChapterPrefix()?.classList?.remove("sbhidden");

        this.enabled = false;
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    toggleSkip(): void {
        if (this.segment && this.enabled) {
            this.skip(this.segment);
            this.disableText();
        }
    }

    disableText(): void {
        if (Config.config.hideSkipButtonPlayerControls) {
            this.disable();
            return;
        }

        this.container.classList.add("textDisabled");
        this.textContainer?.classList?.add("sbhidden");
        this.chapterText?.classList?.remove("sbhidden");

        this.getChapterPrefix()?.classList?.add("sbhidden");

        AnimationUtils.enableAutoHideAnimation(this.skipIcon);
        if (this.onMobileYouTube) {
            this.hideButton();
        }
    }

    updateMobileControls(): void {
        const overlay = document.getElementById("player-control-overlay");

        if (overlay && this.enabled) {
            if (overlay?.classList?.contains("fadein")) {
                this.showButton();
            } else {
                this.hideButton();
            }
        }
    }

    private getTitle(): string {
        return getSkippingText([this.segment], false) + (this.showKeybindHint ? " (" + keybindToString(Config.config.skipToHighlightKeybind) + ")" : "");
    }

    private getChapterPrefix(): HTMLElement {
        return document.querySelector(".ytp-chapter-title-prefix");
    }

    // Swiping away on mobile
    private handleTouchStart(event: TouchEvent): void {
        this.swipeStart = event.touches[0].clientX;
    }

    // Swiping away on mobile
    private handleTouchMove(event: TouchEvent): void {
        const distanceMoved = this.swipeStart - event.touches[0].clientX;
        this.left = Math.min(-distanceMoved, 0);

        this.updateLeftStyle();
    }

    // Swiping away on mobile
    private handleTouchEnd(): void {
        if (this.left < -this.container.offsetWidth / 2) {
            this.disableText();

            // Don't let animation play
            this.skipIcon.style.display = "none";
            setTimeout(() => this.skipIcon.style.removeProperty("display"), 200);
        }

        this.left = 0;
        this.updateLeftStyle();
    }

    // Swiping away on mobile
    private updateLeftStyle() {
        this.container.style.left = this.left + "px";
    }
}
