"use server";

export async function createLostItem(_, formData) {
    const name = formData.get("name");
    const category = formData.get("category");
    const timeframe = formData.get("timeframe");
    const location = formData.get("location");
    const file = formData.get("file");

    // initialize the session
    // const session = await getSession();
    // if (!session) {
    //     return {
    //         success: false,
    //         message: "Please login to submit a lost item."
    //     };
    // }

    if (!name || !category || !timeframe || !location || !file) {
        return {
            success: false,
            message: "Please fill in all fields."
        };
    }

    // Save the lost item to the database
    // change the file name to a unique name
    // submit the formdata to the database;
    // upload the file image to cloudserver;
    // await uploadImage({key: file.name, folder: session.user.id, body:file})

    return {
        success: true,
        message: "Lost item submitted to be found."
    };
}