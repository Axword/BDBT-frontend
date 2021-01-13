<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="items"
      :server-items-length="itemsCount"
      :options.sync="options"
      :footer-props="{ 'items-per-page-options': itemsPerPageOptions }"
      :items-per-page.sync="itemsPerPage"
      :loading="loading"
      item-key="_id"
      class="elevation-1"
      locale="pl-PL"
      :show-group-by="showGroupBy"
      :dense="dense"
      :expanded="expandedRows"
      :fetch-objects="fetchObjects"
      :fetch-bojects-params="fetchObjectParams"
    >
      <template v-slot:item="{ item }">
        <tr
          :dense="dense"
          @click="toggleExpand(item)"
        >
          <td
            v-for="(header, index) in headers"
            :key="`${index}_${item[header.value]}`"
          >
            <slot :name="'item.' + header.value" v-bind:item="item">
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </template>

      <template v-slot:expanded-item="{ item, headers }" v-if="expandable">
        <tr class="v-data-table__expanded v-data-table__expanded__content">
          <slot
            name="expanded-item"
            v-bind:item="item"
            v-bind:headers="headers"
          ></slot>
        </tr>
      </template>

    </v-data-table>

    <div class="v-spacer"></div>
  </v-container>
</template>

<script>
import { paginationAdapter } from '@/store/utils';


export default {
  name: 'TestTable',
  components: {
  },
  props: {
    headers: Array,
    filterContext: {
      type: String,
      default: ''
    },
    items: Array,
    itemsCount: Number,
    getObjects: Function,
    searchObjects: Function,
    fetchObjects: Function,
    fetchObjectParams: Object,
    itemsPerPageOptions: {
      type: Array,
      default: () => [ 5, 10, 25, 100 ]
    },
    getItemsPerPage: Number,
    setItemsPerPage: Function,
    showGroupBy: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: false
    },
    searchField: String,
    searchId: String
  },
  data() {
    return {
      expandedRows: [],
      expandedRowsIds: [],
      options: {
        filterOptions: null
      },
      loading: false,
    };
  },
  methods: {
    toggleExpand: function(item) {
      if (this.expandable === false) return;

      let idx = this.expandedRowsIds.indexOf(item._id);
      if (idx === -1) {
        this.expandedRows.push(item);
        this.expandedRowsIds.push(item._id);
      } else {
        this.expandedRows.splice(idx, 1);
        this.expandedRowsIds.splice(idx, 1);
      }
    },
    applyFilters: function(newOptions) {
      this.options.filterOptions = newOptions;
      this.options.page = 1;
      this.filter();
    },
    filter: function() {
      this.loading = true;
      this.fetchObjects({
        ...this.fetchObjectParams,
        ...this.fetchParams,
      })
        .then(() => this.loading = false);
    },
    applySearch(options) {
      this.options.filterOptions = { ...this.options.filterOptions, ...options };
      this.filter();
    }
  },
  computed: {
    itemsPerPage: {
      get() {
        return this.getItemsPerPage;
      },
      set(value) {
        this.setItemsPerPage(value);
      }
    },
    fetchParams() {
      return paginationAdapter(this.options);
    }
  },
  watch: {
    options: {
      handler() { this.fetchObjects(paginationAdapter(this.options, this.fetchObjectParams)) },
    },
    itemsCount: {
      handler() { 
        if ((this.options.page - 1) * this.options.itemsPerPage === this.itemsCount && !(this.itemsCount === 0)) {
          this.options.page -= 1;
        }
        this.fetchObjects(paginationAdapter(this.options, this.fetchObjectParams));
      }
    }
  }
};
</script>
