import useReviewsApi from "@/modules/Reviews/api/useReviewsApi";
import useToastNotification from "@/components/Toast/useToastNotification";
import AuthUser from "@/Auth/store/AuthUser";
import { useLoadingSpinner } from "@/components/LoadingSpinner";
import ReviewsStore from "@/modules/Reviews/stores/ReviewsStore";
import useConfirmModal from "@/components/ConfirmModal/useConfirmModal";
import { FormStore } from "@/components/BaseForm";
import { useRoute } from "vue-router";
import useRouterService from "@/router/useRouterService";



export default function useReviewsService()
{

    const getAllReviews = async ({ url } = {}) =>
    {
        if (AuthUser.userCanAccess('access-reviews'))
        {
            useLoadingSpinner.show();
            let response = await useReviewsApi.getReviews({
                url: url,
            });

            ReviewsStore.filtered = response.data.data;
            ReviewsStore.list = response.data.data;
            ReviewsStore.pagination = response.data.meta.pagination;
            useLoadingSpinner.hide();
        }
    }

    const storeNewReview = async () =>
    {
        if (AuthUser.userCanAccess('create-reviews'))
        {
            FormStore.showProgress();
            FormStore.clearErrors();

            try
            {
                let response = await useReviewsApi.storeNewReview(FormStore.fields);

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
    const updateReview = async (id) =>
    {
        if (AuthUser.userCanAccess('update-reviews'))
        {
            FormStore.showProgress();
            FormStore.clearErrors();

            try
            {

                let response = await useReviewsApi.updateReview(FormStore.fields, id);


                ReviewsStore.review.reply = response.data.review;

                FormStore.clearFields();
                useToastNotification.open(response.data.message);
            } catch (error)
            {

                FormStore.setErrors(error.response);
            }

            FormStore.hideProgress();
        }
    };
    const deleteReview = async ({ id, index }) =>
    {
        if (AuthUser.userCanAccess('delete-reviews'))
        {
            useConfirmModal.onProgress(true)
            let response = await useReviewsApi.deleteReview(id);

            ReviewsStore.filtered.splice(index, 1);
            useConfirmModal.close();

            useToastNotification.open(response.data.message);

            useConfirmModal.onProgress(false)
        }
    };
    const showReview = async (review_id) =>
    {
        if (AuthUser.userCanAccess('view-reviews'))
        {
            useLoadingSpinner.show();
            FormStore.clearErrors();


            let response = await useReviewsApi.getReview(review_id);

            ReviewsStore.review = response.data.review


            useLoadingSpinner.hide();
        }
    };

    const replyReview = async (review_id) =>
    {

        useLoadingSpinner.show();
        FormStore.clearErrors();


        let response = await useReviewsApi.replyReview(review_id, FormStore.fields);

        ReviewsStore.review.reply = response.data.review;



        useLoadingSpinner.hide();

    };


    return {
        updateReview,
        storeNewReview,
        getAllReviews,
        deleteReview,
        showReview,
        replyReview
    }

}