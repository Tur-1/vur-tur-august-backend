<script setup>
import DropdownMenu from "@/components/DropdownMenu/index.vue";
import ColorsStore from "@/modules/Colors/stores/ColorsStore";
import useColorsService from "@/modules/Colors/services/useColorsService";
import { ref } from "vue";
import { ConfirmModal, useConfirmModal } from "@/components/ConfirmModal";
import defultImage from "@/assets/img/defult-image.png";
import AuthUser from "@/Auth/store/AuthUser";
const { getAllColors, deleteColor } = useColorsService();

await getAllColors();

let color = ref({ id: "", index: "" });

const openModal = ({ id, index }) =>
{
  useConfirmModal.open();
  color.value.id = id;
  color.value.index = index;
};
</script>

<template>
  <transition-group name="list">
    <figure class="card border-1 m-3" style="width: 170px; min-height: 130px"
      v-for="(color, index) in ColorsStore.filtered" :key="color.id">
      <div style="min-height: 100px"
        class="card-header bg-white text-center p-0 overflow-hidden d-flex justify-content-center align-items-center h-100 w-100">
        <img height="76" :src="color.image_url ?? defultImage" class="img-fluid" alt="Logo" />
      </div>

      <figcaption class="p-2 d-flex justify-content-between align-items-center">
        <div class="colorname">
          <h6 class="card-title m-0">{{ color.name }}</h6>
          <small style="font-size: 12px">{{ color.products_count }} items</small>
        </div>
        <DropdownMenu>
          <RouterLink v-if="AuthUser.userCanAccess('view-colors')" class="dropdown-item d-flex align-items-center" :to="{
            name: 'colorsEdit',
            params: { id: color.id },
          }">
            <i class="fa-solid fa-pen-to-square"></i>
            Edit
          </RouterLink>

          <a v-if="AuthUser.userCanAccess('delete-colors')" @click="openModal({ id: color.id, index: index })"
            role="button" class="dropdown-item d-flex align-items-center text-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </a>
        </DropdownMenu>
      </figcaption>
    </figure>
  </transition-group>

  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-center align-items-center">
        <div v-show="ColorsStore.filtered.length == 0">
          <h5 class="text-center">No Colors Found</h5>
        </div>
      </div>
    </div>
  </div>
  <ConfirmModal @onConfirm="deleteColor(color)" @onClose="useConfirmModal.close()" />
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
