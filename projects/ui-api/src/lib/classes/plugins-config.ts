export interface PluginsConfig {
    system: any;
    plugins: Array<Plugin>;
}

export interface Plugin {
    type: string;
    components: Array<string>;
    file: string;
    moduleName: string;
}
