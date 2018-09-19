export interface PluginsConfig {
    system: any,
    plugins: Array<Plugin>
}

export interface Plugin {
    type: string,
    component: string,
    file: string,
    moduleName: string,
}