<script setup>
import { ref } from "vue";
import ButtonLink from "@/components/ButtonLink/index.vue";
import PageHeader from "@/components/PageHeader/index.vue";
import RoleRow from "@/modules/Roles/components/RoleRow.vue";
import RoleRowSkeleton from "@/modules/Roles/components/RoleRowSkeleton.vue";
import useRolesService from "@/modules/Roles/services/useRolesService";
import RolesStore from "@/modules/Roles/stores/RolesStore";
import useConfirmModal from "@/components/ConfirmModal/useConfirmModal";
import { MainTable } from "@/components/MainTable";
import AuthUser from "@/Auth/store/AuthUser";
const { deleteRole, getRoles } = useRolesService();

let fields = ["Name", "Action"];

let Role = ref({ id: "", index: "" });

const openModal = ({ id, index }) => {
  useConfirmModal.open();
  Role.value.id = id;
  Role.value.index = index;
};
</script>
<template>
  <section class="main-section">
    <PageHeader title="Roles List">
      <ButtonLink
        title="New Role"
        routeName="rolesCreate"
        v-if="AuthUser.userCanAccess('create-roles')"
      />
    </PageHeader>

    <MainTable
      v-if="AuthUser.userCanAccess('access-roles')"
      :fields="fields"
      @onChangePage="getRoles"
      @onDelete="deleteRole(Role)"
      :pagination-links="RolesStore.pagination.links"
      :results="RolesStore.pagination.per_page"
      :total-results="RolesStore.pagination.total"
      no-records-found-title="No Roles Found"
      :showNoRecordsFound="RolesStore.filtered.length == 0"
    >
      <Suspense>
        <RoleRow @onDelete="openModal" />

        <template #fallback>
          <RoleRowSkeleton />
        </template>
      </Suspense>
    </MainTable>
  </section>
</template>
