declare module '@analytics/mixpanel' {
  interface Params {
    enabled: boolean;
    token?: string;
    customScriptSrc?: string;
    options: Mixpanel.Config;
  }
  export default function mixpanelPlugin(
    params: Params,
  ): Record<string, unknown>;
}

