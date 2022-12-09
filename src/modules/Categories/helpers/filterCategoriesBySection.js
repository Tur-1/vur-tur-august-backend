import CategoryStore from "@/modules/Categories/stores/CategoryStore";


function filterCategoriesBySection(sectionId)
{
    CategoryStore.value.filtered = CategoryStore.value.list.data.filter((category) =>
    {
        if (sectionId !== null)
        {
            return category.section_id == sectionId;
        } else
        {
            return category;
        }

    });
}


export default filterCategoriesBySection