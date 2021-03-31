import Role from "../models/Role"

export const createRoles = async() => {

try {
    const count = await Role.estimatedDocumentCount()

    if(count > 0) return;
    const values = await Promise.all([
        new Role({ name: 'comprador'}).save(),
        new Role({ name: 'vendedor'}).save(),
        new Role({ name: 'soporte'}).save(),
        new Role({ name: 'ConejoCyberpunk'}).save()
    ])
    console.log(values);
} catch (error) {
    console.error(error);
}
}