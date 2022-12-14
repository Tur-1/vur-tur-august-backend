import { reactive } from "vue";



const useListBox = reactive({
    isOpen: false,
    toggle()
    {
        if (!this.isOpen)
        {
            this.isOpen = true;
        } else
        {
            this.isOpen = false;
        }

    },
    close()
    {

        this.isOpen = false;

    }
});

export default useListBox;