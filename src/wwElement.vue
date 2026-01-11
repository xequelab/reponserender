<template>
  <div class="response-renderer" :style="containerStyle" :class="[`layout-${layout}`, `density-${density}`]">
    <!-- Search Bar -->
    <div v-if="showSearch && hasFields" class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Buscar campos..."
      />
      <span class="search-icon">🔍</span>
    </div>

    <!-- Fields Container -->
    <div class="fields-container" :style="fieldsContainerStyle">
      <div v-if="!hasVisibleFields" class="no-data">
        <span class="no-data-icon">📝</span>
        <p class="no-data-text">{{ searchQuery ? 'Nenhum campo encontrado' : 'Nenhum dado disponível' }}</p>
      </div>

      <template v-else>
        <!-- Grouped Fields -->
        <template v-if="enableGrouping && hasGroups">
          <div v-for="(group, groupKey) in groupedFields" :key="groupKey" class="field-group">
            <div class="group-header" @click="toggleGroup(groupKey)">
              <span class="group-icon">{{ isGroupCollapsed(groupKey) ? '▶' : '▼' }}</span>
              <span class="group-title">{{ groupKey }}</span>
              <span class="group-count">({{ group.length }})</span>
            </div>
            <div v-if="!isGroupCollapsed(groupKey)" class="group-content">
              <FieldItem
                v-for="(field, index) in group"
                :key="field.key || index"
                :field="field"
                :layout="layout"
                :show-divider="showDivider && index < group.length - 1"
                :label-color="labelColor"
                :label-font-size="labelFontSize"
                :label-font-weight="labelFontWeight"
                :value-color="valueColor"
                :value-font-size="valueFontSize"
                :empty-value-color="emptyValueColor"
                :empty-value-text="emptyValueText"
                :field-background-color="fieldBackgroundColor"
                :field-padding="fieldPadding"
                :field-border-radius="fieldBorderRadius"
                :divider-color="dividerColor"
                :enable-copy="enableCopyToClipboard"
                :border-accent-color="borderAccentColor"
                :timeline-line-color="timelineLineColor"
                :timeline-dot-color="timelineDotColor"
                :badge-background-color="badgeBackgroundColor"
                :badge-text-color="badgeTextColor"
                :search-query="searchQuery"
              />
            </div>
          </div>
        </template>

        <!-- Non-grouped Fields -->
        <template v-else>
          <FieldItem
            v-for="(field, index) in processedFields"
            :key="field.key || index"
            :field="field"
            :layout="layout"
            :show-divider="showDivider && index < processedFields.length - 1"
            :label-color="labelColor"
            :label-font-size="labelFontSize"
            :label-font-weight="labelFontWeight"
            :value-color="valueColor"
            :value-font-size="valueFontSize"
            :empty-value-color="emptyValueColor"
            :empty-value-text="emptyValueText"
            :field-background-color="fieldBackgroundColor"
            :field-padding="fieldPadding"
            :field-border-radius="fieldBorderRadius"
            :divider-color="dividerColor"
            :enable-copy="enableCopyToClipboard"
            :border-accent-color="borderAccentColor"
            :timeline-line-color="timelineLineColor"
            :timeline-dot-color="timelineDotColor"
            :badge-background-color="badgeBackgroundColor"
            :badge-text-color="badgeTextColor"
            :search-query="searchQuery"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import FieldItem from './components/FieldItem.vue';

export default {
  name: 'ResponseRenderer',
  components: {
    FieldItem
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      required: true
    }
    /* wwEditor:end */
  },
  setup(props) {
    const searchQuery = ref('');
    const collapsedGroups = ref(new Set());

    // Parse response data
    const responseData = computed(() => {
      try {
        const data = props.content?.responseData;
        if (!data) return null;

        if (typeof data === 'string') {
          return JSON.parse(data);
        }

        return data;
      } catch (error) {
        console.error('Error parsing response data:', error);
        return null;
      }
    });

    // Extract fields from dados.campos
    const fields = computed(() => {
      const dados = responseData.value?.dados;
      if (!dados) return [];

      const campos = dados.campos;
      if (!Array.isArray(campos)) return [];

      return campos;
    });

    const hasFields = computed(() => fields.value && fields.value.length > 0);

    // Filter empty fields
    const filteredFields = computed(() => {
      let result = fields.value;

      if (props.content?.hideEmptyFields) {
        result = result.filter(field => {
          const val = field?.valor;
          return val !== null && val !== undefined && val !== '';
        });
      }

      return result;
    });

    // Apply search filter
    const searchedFields = computed(() => {
      if (!searchQuery.value.trim()) {
        return filteredFields.value;
      }

      const query = searchQuery.value.toLowerCase();
      return filteredFields.value.filter(field => {
        const label = String(field?.label || field?.key || '').toLowerCase();
        const value = String(field?.valor || '').toLowerCase();
        return label.includes(query) || value.includes(query);
      });
    });

    // Sort fields
    const processedFields = computed(() => {
      const sortMethod = props.content?.sortFields || 'original';
      let result = [...searchedFields.value];

      switch (sortMethod) {
        case 'alphabetical':
          result.sort((a, b) => {
            const labelA = String(a?.label || a?.key || '').toLowerCase();
            const labelB = String(b?.label || b?.key || '').toLowerCase();
            return labelA.localeCompare(labelB);
          });
          break;
        case 'filled-first':
          result.sort((a, b) => {
            const isEmptyA = a?.valor === null || a?.valor === undefined || a?.valor === '';
            const isEmptyB = b?.valor === null || b?.valor === undefined || b?.valor === '';
            return isEmptyA === isEmptyB ? 0 : isEmptyA ? 1 : -1;
          });
          break;
        case 'empty-first':
          result.sort((a, b) => {
            const isEmptyA = a?.valor === null || a?.valor === undefined || a?.valor === '';
            const isEmptyB = b?.valor === null || b?.valor === undefined || b?.valor === '';
            return isEmptyA === isEmptyB ? 0 : isEmptyA ? -1 : 1;
          });
          break;
        default: // 'original'
          break;
      }

      return result;
    });

    // Group fields by category
    const groupedFields = computed(() => {
      const groups = {};

      processedFields.value.forEach(field => {
        const category = field?.category || 'Sem categoria';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(field);
      });

      return groups;
    });

    const hasGroups = computed(() => {
      return Object.keys(groupedFields.value).length > 1 ||
             (Object.keys(groupedFields.value).length === 1 && !groupedFields.value['Sem categoria']);
    });

    const hasVisibleFields = computed(() => processedFields.value.length > 0);

    const toggleGroup = (groupKey) => {
      if (collapsedGroups.value.has(groupKey)) {
        collapsedGroups.value.delete(groupKey);
      } else {
        collapsedGroups.value.add(groupKey);
      }
    };

    const isGroupCollapsed = (groupKey) => {
      return collapsedGroups.value.has(groupKey);
    };

    // Computed styles
    const containerStyle = computed(() => ({
      padding: props.content?.containerPadding || '24px',
      backgroundColor: props.content?.containerBackgroundColor || '#ffffff',
      borderRadius: props.content?.containerBorderRadius || '8px',
      borderColor: props.content?.containerBorderColor || '#e0e0e0',
      borderWidth: props.content?.containerBorderWidth || '1px',
      '--field-gap': props.content?.fieldGap || '16px'
    }));

    const fieldsContainerStyle = computed(() => ({
      gap: props.content?.fieldGap || '16px'
    }));

    return {
      searchQuery,
      fields,
      hasFields,
      processedFields,
      groupedFields,
      hasGroups,
      hasVisibleFields,
      toggleGroup,
      isGroupCollapsed,
      containerStyle,
      fieldsContainerStyle,
      // Props passthrough
      layout: computed(() => props.content?.layout || 'card'),
      density: computed(() => props.content?.density || 'comfortable'),
      showSearch: computed(() => props.content?.showSearch || false),
      enableGrouping: computed(() => props.content?.enableGrouping || false),
      enableCopyToClipboard: computed(() => props.content?.enableCopyToClipboard !== false),
      emptyValueText: computed(() => props.content?.emptyValueText || 'Sem resposta'),
      labelColor: computed(() => props.content?.labelColor || '#081B4E'),
      labelFontSize: computed(() => props.content?.labelFontSize || '14px'),
      labelFontWeight: computed(() => props.content?.labelFontWeight || '600'),
      valueColor: computed(() => props.content?.valueColor || '#333333'),
      valueFontSize: computed(() => props.content?.valueFontSize || '15px'),
      emptyValueColor: computed(() => props.content?.emptyValueColor || '#999999'),
      fieldBackgroundColor: computed(() => props.content?.fieldBackgroundColor || '#f8f9fa'),
      fieldPadding: computed(() => props.content?.fieldPadding || '12px 16px'),
      fieldBorderRadius: computed(() => props.content?.fieldBorderRadius || '6px'),
      showDivider: computed(() => props.content?.showDivider !== false),
      dividerColor: computed(() => props.content?.dividerColor || '#e0e0e0'),
      borderAccentColor: computed(() => props.content?.borderAccentColor || '#081B4E'),
      timelineLineColor: computed(() => props.content?.timelineLineColor || '#e0e0e0'),
      timelineDotColor: computed(() => props.content?.timelineDotColor || '#081B4E'),
      badgeBackgroundColor: computed(() => props.content?.badgeBackgroundColor || '#081B4E'),
      badgeTextColor: computed(() => props.content?.badgeTextColor || '#ffffff')
    };
  }
};
</script>

<style scoped lang="scss">
.response-renderer {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-style: solid;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .search-container {
    position: relative;
    margin-bottom: 16px;

    .search-input {
      width: 100%;
      padding: 10px 40px 10px 14px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        border-color: #081B4E;
        box-shadow: 0 0 0 3px rgba(8, 27, 78, 0.1);
      }

      &::placeholder {
        color: #999;
      }
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .field-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .group-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #f8f9fa;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      margin-bottom: 12px;

      &:hover {
        background: #e9ecef;
      }

      .group-icon {
        font-size: 12px;
        color: #666;
        transition: transform 0.2s ease;
      }

      .group-title {
        font-weight: 600;
        font-size: 14px;
        color: #081B4E;
        flex: 1;
      }

      .group-count {
        font-size: 12px;
        color: #999;
      }
    }

    .group-content {
      display: flex;
      flex-direction: column;
      gap: var(--field-gap, 16px);
    }
  }

  .fields-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      gap: 12px;
      opacity: 0.6;

      .no-data-icon {
        font-size: 48px;
        opacity: 0.5;
      }

      .no-data-text {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
    }
  }

  // Layout variants
  &.layout-card {
    .fields-container {
      gap: var(--field-gap, 16px);
    }
  }

  &.layout-list {
    .fields-container {
      gap: 0;
    }
  }

  &.layout-compact {
    .fields-container {
      gap: calc(var(--field-gap, 16px) * 0.5);
    }
  }

  &.layout-grid {
    .fields-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--field-gap, 16px);
    }
  }

  &.layout-table {
    .fields-container {
      gap: 0;
    }
  }

  // Density variants
  &.density-comfortable {
    --density-multiplier: 1;
  }

  &.density-compact {
    --density-multiplier: 0.75;
  }

  &.density-extra-compact {
    --density-multiplier: 0.5;
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    &.layout-grid {
      .fields-container {
        grid-template-columns: 1fr;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 16px !important;
  }
}
</style>
