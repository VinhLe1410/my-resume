import { browser } from '$app/environment';
import { isMobile } from 'is-mobile';

class DeviceStore {
  readonly isActualMobile: boolean = browser ? isMobile({ tablet: true }) : false;

  #viewportWidth = $state(browser ? window.innerWidth : 1024);
  #userPrefersMode = $state<'auto' | 'mobile'>('auto');

  constructor() {
    if (browser) {
      window.addEventListener('resize', () => {
        this.#viewportWidth = window.innerWidth;
      });
    }
  }

  // viewport 480–768px on desktop → use horizontal titles instead of vertical
  get useCompactTitles(): boolean {
    return !this.isActualMobile && this.#viewportWidth < 768;
  }

  // Use mobile layout when:
  // - actual mobile/tablet device, OR
  // - desktop with viewport < 480px, OR
  // - desktop user manually toggled to mobile
  get useMobileLayout(): boolean {
    return (
      this.isActualMobile || (!this.isActualMobile && this.#viewportWidth < 480) || this.#userPrefersMode === 'mobile'
    );
  }

  get userPrefersMode(): 'auto' | 'mobile' {
    return this.#userPrefersMode;
  }

  toggleLayoutMode(): void {
    this.#userPrefersMode = this.#userPrefersMode === 'mobile' ? 'auto' : 'mobile';
  }
}

export const device = new DeviceStore();
