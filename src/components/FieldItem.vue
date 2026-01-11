<template>
  <div class="field-item" :class="`layout-${layout}`" :style="fieldStyle" :title="tooltipText">
    <div v-if="layout === 'timeline'" class="timeline-decorator" :style="timelineDecoratorStyle">
      <div class="timeline-dot" :style="{ backgroundColor: timelineDotColor }"></div>
      <div class="timeline-line" :style="{ backgroundColor: timelineLineColor }"></div>
    </div>

    <div class="field-content">
      <div v-if="layout === 'badge'" class="badge-label" :style="badgeStyle">
        <span v-html="highlightedLabel"></span>
      </div>
      <label v-else class="field-label" :style="labelStyle">
        <span v-html="highlightedLabel"></span>
      </label>

      <div class="field-value-container">
        <component
          :is="isUrl ? 'a' : 'div'"
          class="field-value"
          :style="valueStyle"
          :href="isUrl ? displayValue : undefined"
          :target="isUrl ? '_blank' : undefined"
          :rel="isUrl ? 'noopener noreferrer' : undefined"
        >
          <span v-html="highlightedValue"></span>
          <span v-if="isUrl" class="url-icon">🔗</span>
        </component>

        <button
          v-if="enableCopy && !isEmpty"
          class="copy-button"
          @click="copyToClipboard"
          :title="copied ? 'Copiado!' : 'Copiar'"
          :class="{ copied }"
        >
          {{ copied ? '✓' : '📋' }}
        </button>
      </div>
    </div>

    <div v-if="showDivider" class="field-divider" :style="dividerStyle"></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

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
    },
    enableCopy: {
      type: Boolean,
      default: true
    },
    borderAccentColor: {
      type: String,
      default: '#081B4E'
    },
    timelineLineColor: {
      type: String,
      default: '#e0e0e0'
    },
    timelineDotColor: {
      type: String,
      default: '#081B4E'
    },
    badgeBackgroundColor: {
      type: String,
      default: '#081B4E'
    },
    badgeTextColor: {
      type: String,
      default: '#ffffff'
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const copied = ref(false);

    const isEmpty = computed(() => {
      const val = props.field?.valor;
      return val === null || val === undefined || val === '';
    });

    const displayLabel = computed(() => {
      const label = props.field?.label || props.field?.key || '';
      return String(label);
    });

    const displayValue = computed(() => {
      if (isEmpty.value) {
        return props.emptyValueText;
      }
      return String(props.field.valor);
    });

    // URL detection
    const isUrl = computed(() => {
      if (isEmpty.value) return false;
      const value = displayValue.value;
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      return urlPattern.test(value) || value.startsWith('http://') || value.startsWith('https://');
    });

    // Highlight search query
    const highlightText = (text, query) => {
      if (!query.trim()) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    };

    const highlightedLabel = computed(() => {
      return highlightText(displayLabel.value, props.searchQuery);
    });

    const highlightedValue = computed(() => {
      return highlightText(displayValue.value, props.searchQuery);
    });

    // Tooltip for truncated text
    const tooltipText = computed(() => {
      if (displayValue.value.length > 100) {
        return `${displayLabel.value}: ${displayValue.value}`;
      }
      return '';
    });

    // Copy to clipboard
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(displayValue.value);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const fieldStyle = computed(() => {
      const styles = {};

      if (props.layout === 'card' || props.layout === 'compact' || props.layout === 'grid') {
        styles.backgroundColor = props.fieldBackgroundColor;
        styles.padding = props.fieldPadding;
        styles.borderRadius = props.fieldBorderRadius;
      }

      if (props.layout === 'bordered') {
        styles.backgroundColor = props.fieldBackgroundColor;
        styles.padding = props.fieldPadding;
        styles.borderRadius = props.fieldBorderRadius;
        styles.borderLeft = `4px solid ${props.borderAccentColor}`;
      }

      if (props.layout === 'list' || props.layout === 'minimal') {
        styles.padding = props.fieldPadding;
      }

      if (props.layout === 'inline') {
        styles.padding = props.fieldPadding;
      }

      if (props.layout === 'timeline') {
        styles.backgroundColor = props.fieldBackgroundColor;
        styles.padding = props.fieldPadding;
        styles.borderRadius = props.fieldBorderRadius;
        styles.marginLeft = '30px';
      }

      if (props.layout === 'table') {
        styles.padding = props.fieldPadding;
      }

      if (props.layout === 'badge') {
        styles.padding = props.fieldPadding;
      }

      return styles;
    });

    const labelStyle = computed(() => ({
      color: props.labelColor,
      fontSize: props.labelFontSize,
      fontWeight: props.labelFontWeight
    }));

    const valueStyle = computed(() => {
      const styles = {
        color: isEmpty.value ? props.emptyValueColor : props.valueColor,
        fontSize: props.valueFontSize,
        fontStyle: isEmpty.value ? 'italic' : 'normal'
      };

      if (isUrl.value) {
        styles.color = '#0066cc';
        styles.textDecoration = 'underline';
        styles.cursor = 'pointer';
      }

      return styles;
    });

    const dividerStyle = computed(() => ({
      backgroundColor: props.dividerColor
    }));

    const badgeStyle = computed(() => ({
      backgroundColor: props.badgeBackgroundColor,
      color: props.badgeTextColor
    }));

    const timelineDecoratorStyle = computed(() => ({
      // Styles defined in CSS
    }));

    return {
      copied,
      isEmpty,
      displayLabel,
      displayValue,
      isUrl,
      highlightedLabel,
      highlightedValue,
      tooltipText,
      copyToClipboard,
      fieldStyle,
      labelStyle,
      valueStyle,
      dividerStyle,
      badgeStyle,
      timelineDecoratorStyle
    };
  }
};
</script>

<style scoped lang="scss">
.field-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  transition: all 0.2s ease;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

    ::v-deep(mark) {
      background-color: #fff3cd;
      padding: 2px 4px;
      border-radius: 2px;
    }
  }

  .field-value-container {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    position: relative;
  }

  .field-value {
    display: block;
    margin: 0;
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    flex: 1;

    &[href] {
      text-decoration: underline;
      transition: color 0.2s ease;

      &:hover {
        color: #0052a3 !important;
      }
    }

    .url-icon {
      margin-left: 4px;
      font-size: 0.9em;
      opacity: 0.7;
    }

    ::v-deep(mark) {
      background-color: #fff3cd;
      padding: 2px 4px;
      border-radius: 2px;
    }
  }

  .copy-button {
    flex-shrink: 0;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    opacity: 0;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    &.copied {
      background: #28a745;
      color: white;
      border-color: #28a745;
      opacity: 1 !important;
    }
  }

  &:hover .copy-button {
    opacity: 1;
  }

  .field-divider {
    height: 1px;
    width: 100%;
    margin-top: 16px;
  }

  .badge-label {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.85em;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin-bottom: 4px;
    width: fit-content;
  }

  .timeline-decorator {
    position: absolute;
    left: -30px;
    top: 0;
    bottom: 0;
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .timeline-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 6px;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 1);
    }

    .timeline-line {
      width: 2px;
      flex: 1;
      margin-top: 4px;
    }
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

  // Grid layout
  &.layout-grid {
    border: 1px solid rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }

  // Inline layout - label and value side by side
  &.layout-inline {
    .field-content {
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }

    .field-label {
      min-width: 30%;
      max-width: 40%;
      flex-shrink: 0;
    }

    .field-value-container {
      flex: 1;
    }
  }

  // Bordered layout - accent border on left
  &.layout-bordered {
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transform: translateX(2px);
    }
  }

  // Timeline layout
  &.layout-timeline {
    border: 1px solid rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    &:last-child {
      .timeline-line {
        display: none;
      }
    }
  }

  // Table layout - like a table row
  &.layout-table {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.02);
    }

    &:hover {
      background-color: rgba(8, 27, 78, 0.03);
    }

    .field-content {
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }

    .field-label {
      min-width: 35%;
      max-width: 35%;
      flex-shrink: 0;
      font-weight: 600;
    }

    .field-value-container {
      flex: 1;
    }
  }

  // Minimal layout - ultra clean
  &.layout-minimal {
    .field-content {
      gap: 4px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.01);
    }
  }

  // Badge layout
  &.layout-badge {
    .field-content {
      gap: 8px;
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

    &.layout-inline,
    &.layout-table {
      .field-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .field-label {
        min-width: unset;
        max-width: unset;
      }
    }

    &.layout-timeline {
      margin-left: 20px !important;

      .timeline-decorator {
        left: -20px;
        width: 20px;

        .timeline-dot {
          width: 8px;
          height: 8px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    &.layout-card,
    &.layout-compact,
    &.layout-grid,
    &.layout-bordered {
      padding: 10px 12px !important;
    }

    &.layout-list,
    &.layout-minimal,
    &.layout-table {
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

    .copy-button {
      opacity: 1;
    }
  }
}
</style>
