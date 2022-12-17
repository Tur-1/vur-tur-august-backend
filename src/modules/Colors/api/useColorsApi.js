import api from "@/api";



const getAllColors = () =>
{
    return api().get('colors');
}
const storeNewColor = (fields) =>
{

    return api().post("/colors/store", fields);
}
const updateColor = ({ fields, id }) =>
{

    return api().post("/colors/update/" + id, fields);
}
const getColor = (id) =>
{
    return api().post("/colors/show/" + id);
}
const deleteColor = (id) =>
{
    return api().delete("/colors/delete/" + id);
}

export default {
    storeNewColor,
    updateColor,
    getColor,
    getAllColors,
    deleteColor
}