namespace esc {
    export class EntityManager {

        private static entities: Entity[] = [];

        public static addEntity(entity: Entity): void {
            EntityManager.entities.push(entity);
        }

        public static removeEntity(entity: Entity): void {
            let list = EntityManager.entities;
            for (let i = 0; i < list.length; i++) {
                if (list[i] == entity) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    }
}