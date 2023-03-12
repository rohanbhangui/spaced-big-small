import {
  Analytics as analyticsInstance,
  AnalyticsInstance as BaseAnalyticsInstance,
} from 'analytics'
import mixpanelPlugin from '@analytics/mixpanel'
import { Modify } from 'global';

const IS_BROWSER = typeof window !== 'undefined'

export enum Event {
  PAGE_VIEWED = 'Page Viewed',
  PAGE_NOT_FOUND = 'Page Not Found',
  SEARCH = 'Search'
}

type BasePlugins = BaseAnalyticsInstance['plugins'];

interface Plugins extends BasePlugins {
  mixpanel: { alias: (alias: string, original: string) => void };
}

export type AnalyticsInstance = Modify<
  BaseAnalyticsInstance,
  {
    plugins: Plugins;
  }
>;

const plugins = [
  mixpanelPlugin({
    enabled: true,
    token: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN,
    options: {
      // // eslint-disable-next-line camelcase
      // api_host: 'https://sesame.hireborderless.com',
      loaded: () => {
        window.mixpanel?.register_once({
          source: 'web',
        });
      },
    },
  }),
]

export const analytics = analyticsInstance({
  app: 'ProjectSpce',
  plugins: [
    ...(IS_BROWSER ? plugins : [])
  ],
}) as unknown as AnalyticsInstance;