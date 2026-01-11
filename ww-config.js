export default {
  editor: {
    label: {
      en: 'Response Renderer',
      pt: 'Renderizador de Respostas'
    },
    icon: 'fontawesome/solid/file-alt'
  },
  properties: {
    // Data Input
    responseData: {
      label: {
        en: 'Response Data',
        pt: 'Dados da Resposta'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: null,
      /* wwEditor:start */
      bindingValidation: {
        type: 'object',
        tooltip: 'Object with id, criado_em, and dados.campos array'
      },
      propertyHelp: {
        tooltip: 'Bind to the response object from Supabase collection'
      }
      /* wwEditor:end */
    },

    // Display Settings
    emptyValueText: {
      label: {
        en: 'Empty Value Text',
        pt: 'Texto para Valor Vazio'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Sem resposta',
      options: {
        placeholder: 'Sem resposta'
      }
    },

    // Layout
    layout: {
      label: {
        en: 'Layout Style',
        pt: 'Estilo do Layout'
      },
      type: 'TextRadioGroup',
      section: 'settings',
      defaultValue: 'card',
      options: {
        choices: [
          {
            value: 'card',
            title: 'Card',
            icon: 'credit-card'
          },
          {
            value: 'list',
            title: 'List',
            icon: 'list'
          },
          {
            value: 'compact',
            title: 'Compact',
            icon: 'menu'
          }
        ]
      }
    },

    // Style - Container
    containerPadding: {
      label: {
        en: 'Container Padding',
        pt: 'Padding do Container'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '24px',
      responsive: true,
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 100 }
        ]
      }
    },

    containerBackgroundColor: {
      label: {
        en: 'Container Background',
        pt: 'Fundo do Container'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#ffffff',
      options: {
        nullable: true
      }
    },

    containerBorderRadius: {
      label: {
        en: 'Container Border Radius',
        pt: 'Arredondamento do Container'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },

    containerBorderColor: {
      label: {
        en: 'Container Border Color',
        pt: 'Cor da Borda do Container'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#e0e0e0',
      options: {
        nullable: true
      }
    },

    containerBorderWidth: {
      label: {
        en: 'Container Border Width',
        pt: 'Largura da Borda do Container'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '1px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 10 }
        ]
      }
    },

    // Style - Fields
    fieldGap: {
      label: {
        en: 'Gap Between Fields',
        pt: 'Espaçamento entre Campos'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '16px',
      responsive: true,
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },

    labelColor: {
      label: {
        en: 'Label Color',
        pt: 'Cor do Label'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#081B4E'
    },

    labelFontSize: {
      label: {
        en: 'Label Font Size',
        pt: 'Tamanho da Fonte do Label'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '14px',
      responsive: true,
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 24 }
        ]
      }
    },

    labelFontWeight: {
      label: {
        en: 'Label Font Weight',
        pt: 'Peso da Fonte do Label'
      },
      type: 'TextSelect',
      section: 'style',
      defaultValue: '600',
      options: {
        options: [
          { value: '400', label: 'Normal' },
          { value: '500', label: 'Medium' },
          { value: '600', label: 'Semi Bold' },
          { value: '700', label: 'Bold' }
        ]
      }
    },

    valueColor: {
      label: {
        en: 'Value Color',
        pt: 'Cor do Valor'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#333333'
    },

    valueFontSize: {
      label: {
        en: 'Value Font Size',
        pt: 'Tamanho da Fonte do Valor'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '15px',
      responsive: true,
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 24 }
        ]
      }
    },

    emptyValueColor: {
      label: {
        en: 'Empty Value Color',
        pt: 'Cor do Valor Vazio'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#999999'
    },

    // Field Background (for card/compact layouts)
    fieldBackgroundColor: {
      label: {
        en: 'Field Background',
        pt: 'Fundo do Campo'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#f8f9fa',
      options: {
        nullable: true
      }
    },

    fieldPadding: {
      label: {
        en: 'Field Padding',
        pt: 'Padding do Campo'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '12px 16px'
    },

    fieldBorderRadius: {
      label: {
        en: 'Field Border Radius',
        pt: 'Arredondamento do Campo'
      },
      type: 'Length',
      section: 'style',
      defaultValue: '6px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 20 }
        ]
      }
    },

    // Divider (for list layout)
    showDivider: {
      label: {
        en: 'Show Divider',
        pt: 'Mostrar Divisor'
      },
      type: 'OnOff',
      section: 'style',
      defaultValue: true,
      hidden: content => content.layout !== 'list'
    },

    dividerColor: {
      label: {
        en: 'Divider Color',
        pt: 'Cor do Divisor'
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#e0e0e0',
      hidden: content => content.layout !== 'list' || !content.showDivider
    }
  }
};
