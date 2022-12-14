import useCategoryApi from "@/modules/Categories/api/useCategoryApi";

import useRouterService from "@/router/useRouterService";

import { useLoadingSpinner } from "@/components/LoadingSpinner"; import AuthUser from "@/Auth/store/AuthUser";
import useToastNotification from "@/components/Toast/useToastNotification";
import { useRoute } from "vue-router";
import { FormStore } from "@/components/BaseForm";
import { appendFormData } from "@/helpers";


export default function useSectionService()
{

    const storeNewSection = async (formData) =>
    {
        if (AuthUser.userCanAccess('create-categories'))
        {
            FormStore.showProgress();
            FormStore.clearErrors();

            try
            {
                const formData = appendFormData(FormStore.fields);

                let response = await useCategoryApi.storeNewSection(formData);

                FormStore.clearFields();

                useRouterService.redirectBack();

                useToastNotification.open(response.data.message);



            } catch (error)
            {
                FormStore.setErrors(error.response);
            }
            FormStore.hideProgress();
        }
    };
    const showSection = async () =>
    {
        if (AuthUser.userCanAccess('view-categories'))
        {
            useLoadingSpinner.show();

            const route = useRoute();

            let response = await useCategoryApi.getCategory(route.params.id);

            FormStore.setFields(response.data);

            useLoadingSpinner.hide();
        }
    };
    const updateSection = async (formData) =>
    {
        if (AuthUser.userCanAccess('update-categories'))
        {
            FormStore.showProgress();
            FormStore.clearErrors();

            try
            {

                const formData = appendFormData(FormStore.fields);

                let response = await useCategoryApi.updateSection({
                    id: FormStore.fields.id,
                    formData: formData
                });

                FormStore.setFields(response.data.category);
                useToastNotification.open(response.data.message);

            } catch (error)
            {

                FormStore.setErrors(error.response);
            }
            FormStore.hideProgress();
        }
    };
    return {

        storeNewSection,
        showSection,
        updateSection
    }

}