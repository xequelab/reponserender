<template>
  <div class="field-item" :class="`layout-${layout}`" :style="fieldStyle">
    <div class="field-content">
      <label class="field-label" :style="labelStyle" v-text="displayLabel"></label>
      <div class="field-value" :style="valueStyle" v-text="displayValue"></div>
    </div>
    <div v-if="showDivider" class="field-divider" :style="dividerStyle"></div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'FieldItem',
  props: {
    field: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'card'
    },
    showDivider: {
      type: Boolean,
      default: false
    },
    labelColor: {
      type: String,
      default: '#081B4E'
    },
    labelFontSize: {
      type: String,
      default: '14px'
    },
    labelFontWeight: {
      type: String,
      default: '600'
    },
    valueColor: {
      type: String,
      default: '#333333'
    },
    valueFontSize: {
      type: String,
      default: '15px'
    },
    emptyValueColor: {
      type: String,
      default: '#999999'
    },
    emptyValueText: {
      type: String,
      default: 'Sem resposta'
    },
    fieldBackgroundColor: {
      type: String,
      default: '#f8f9fa'
    },
    fieldPadding: {
      type: String,
      default: '12px 16px'
    },
    fieldBorderRadius: {
      type: String,
      default: '6px'
    },
    dividerColor: {
      type: String,
      default: '#e0e0e0'
    }
  },
  setup(props) {
    const isEmpty = computed(() => {
      const val = props.field?.valor;
      return val === null || val === undefined || val === '';
    });

    const displayLabel = computed(() => {
      const label = props.field?.label || props.field?.key || '';
      // Debug: log to console
      console.log('Field label:', label, 'Type:', typeof label);
      return String(label);
    });

    const displayValue = computed(() => {
      if (isEmpty.value) {
        return props.emptyValueText;
      }
      return String(props.field.valor);
    });

    const fieldStyle = computed(() => {
      const styles = {};

      if (props.layout === 'card' || props.layout === 'compact') {
        styles.backgroundColor = props.fieldBackgroundColor;
        styles.padding = props.fieldPadding;
        styles.borderRadius = props.fieldBorderRadius;
      }

      if (props.layout === 'list') {
        styles.padding = props.fieldPadding;
      }

      return styles;
    });

    const labelStyle = computed(() => ({
      color: props.labelColor,
      fontSize: props.labelFontSize,
      fontWeight: props.labelFontWeight
    }));

    const valueStyle = computed(() => ({
      color: isEmpty.value ? props.emptyValueColor : props.valueColor,
      fontSize: props.valueFontSize,
      fontStyle: isEmpty.value ? 'italic' : 'normal'
    }));

    const dividerStyle = computed(() => ({
      backgroundColor: props.dividerColor
    }));

    return {
      isEmpty,
      displayLabel,
      displayValue,
      fieldStyle,
      labelStyle,
      valueStyle,
      dividerStyle
    };
  }
};
</script>

<style scoped lang="scss">
.field-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.2s ease;

  .field-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .field-label {
    display: block;
    margin: 0;
    line-height: 1.4;
    letter-spacing: 0.01em;
  }

  .field-value {
    display: block;
    margin: 0;
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .field-divider {
    height: 1px;
    width: 100%;
    margin-top: 16px;
  }

  // Card layout - boxed fields
  &.layout-card {
    border: 1px solid rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }

  // List layout - simple rows with dividers
  &.layout-list {
    .field-divider {
      margin-top: 16px;
    }
  }

  // Compact layout - minimal spacing
  &.layout-compact {
    .field-content {
      gap: 4px;
    }

    .field-label {
      font-size: 0.95em;
    }

    .field-value {
      font-size: 0.95em;
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    .field-content {
      gap: 5px;
    }

    .field-label {
      font-size: 13px !important;
    }

    .field-value {
      font-size: 14px !important;
    }
  }

  @media (max-width: 480px) {
    &.layout-card,
    &.layout-compact {
      padding: 10px 12px !important;
    }

    &.layout-list {
      padding: 12px 0 !important;
    }

    .field-content {
      gap: 4px;
    }

    .field-label {
      font-size: 12px !important;
    }

    .field-value {
      font-size: 13px !important;
    }
  }
}
</style>
