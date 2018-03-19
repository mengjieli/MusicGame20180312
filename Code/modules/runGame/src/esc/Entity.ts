namespace esc {
    export class Entity {

        private _id: string;

        $components: Component[] = [];

        constructor(id: string) {
            this._id = id || lib.Help.getuuid();
        }

        public get id(): string {
            return this._id;
        }

        public addComponent(component: Component) {
            this.$components.push(component);
        }

        public removeComponent(component: Component) {

        }

        $update(): void {

        }
    }
}