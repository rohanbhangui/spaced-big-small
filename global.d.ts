import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
    interface Window {
        mixpanel: any;
    }
}

type Modify<T, R> = Omit<T, keyof R> & R;