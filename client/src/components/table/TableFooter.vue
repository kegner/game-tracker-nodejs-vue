<template>
  <tfoot>
    <tr>
      <td colspan="4" class="border-0">
        <div class="d-flex">
          <div class="align-self-center ms-1">
            <TableCount :pageIndex="pageIndex" :itemsPerPage="itemsPerPage" />
          </div>
          <div class="ms-auto">
            <TablePagination :pageIndex="pageIndex" :gamesPages="gamesPages" @pageChange="pageButtonHandler" />
          </div>
        </div>
      </td>
    </tr>
  </tfoot>
</template>

<script>
import TableCount from '@/components/table/TableCount.vue';
import TablePagination  from '@/components/table/TablePagination.vue';

export default {
  components: {
    TableCount,
    TablePagination
  },
  props: {
    gamesPages: Array,
    pageIndex: Number,
    itemsPerPage: Number
  },
  methods: {
    pageButtonHandler(index) {
      this.$emit("pageChange", index);
    }
  }
}
</script>

<style>

</style>