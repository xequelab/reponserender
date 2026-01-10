<template>
  <div class="response-renderer" :style="containerStyle" :class="`layout-${layout}`">
    <!-- Fields Container -->
    <div class="fields-container" :style="fieldsContainerStyle">
      <div v-if="!hasFields" class="no-data">
        <span class="no-data-icon">📝</span>
        <p class="no-data-text">Nenhum dado disponível</p>
      </div>

      <template v-else>
        <FieldItem
          v-for="(field, index) in fields"
          :key="field.key || index"
          :field="field"
          :layout="layout"
          :show-divider="showDivider && index < fields.length - 1"
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
        />
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
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
    // Parse response data
    const responseData = computed(() => {
      try {
        const data = props.content?.responseData;
        if (!data) return null;

        // If it's a string, try to parse it
        if (typeof data === 'string') {
          return JSON.parse(data);
        }

        // If it's already an object, return it
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
      fields,
      hasFields,
      containerStyle,
      fieldsContainerStyle,
      // Props passthrough
      layout: computed(() => props.content?.layout || 'card'),
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
      dividerColor: computed(() => props.content?.dividerColor || '#e0e0e0')
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

  // Responsive adjustments
  @media (max-width: 480px) {
    padding: 16px !important;
  }
}
</style>
