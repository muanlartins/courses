import { createSystem, defaultConfig, defineRecipe, defineSlotRecipe} from "@chakra-ui/react"
import { checkboxAnatomy, selectAnatomy } from "@chakra-ui/react/anatomy";
import { mode } from '@chakra-ui/theme-tools';

const inputRecipe = defineRecipe({
  variants: {
    subtle: {
      _focus: {
        borderColor: 'brand.500'
      }
    },
    size: {
      md: {
        borderRadius: 'none'
      },
    },
  },
});

const selectRecipe = defineSlotRecipe({
  className: "chakra-select",
  slots: selectAnatomy.keys(),
  base: {
    trigger: {
      borderRadius: 'none',
      _focus: {
        borderColor: 'brand.500'
      }
    },
    content: {
      borderRadius: 'none',
      _focus: {
        borderColor: 'brand.500'
      }
    }
  },
  variants: {
    variant: {
      subtle: {
        trigger: {
          borderWidth: "1px",
          bg: "bg.muted",
          _focus: {
            borderColor: 'brand.500',
          }
        },
        content: {
          borderWidth: "1px",
          bg: "bg.muted",
          _focus: {
            borderColor: "brand.500",
          }
        }
      },
    },
  },
});

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      primary: {
        rounded: "none",
        ring: 2,
        ringColor: "brand.500",
        color: 'white',
        backgroundColor: 'brand.500',

        _hover: {
          backgroundColor: 'brand.600',
        },

        _active: {
          backgroundColor: 'brand.700',
        },

        _dark: {
          color: "gray.800",
          backgroundColor: "brand.200",

          _hover: {
            backgroundColor: "brand.300",
          },

          _active: {
            backgroundColor: "brand.400",
          },
        }
      }
    },
  }
});

const checkboxRecipe = defineSlotRecipe({
  className: "chakra-checkbox",
  slots: checkboxAnatomy.keys(),
  base: {
    control: {
      borderRadius: "none",

      _checked: {
        backgroundColor: 'brand.500',

        _hover: {
          backgroundColor: 'brand.600',
        },
      },

      _dark: {
        _checked: {
          backgroundColor: "brand.200",

          _hover: {
            backgroundColor: "brand.300",
          },
        },

        _icon: {
          color: "gray.800"
        }
      }
    }
  },
});

export const system = createSystem(defaultConfig, {
  theme: {
    recipes: {
      input: inputRecipe,
      button: buttonRecipe
    },
    slotRecipes: {
      select: selectRecipe,
      checkbox: checkboxRecipe
    },
    tokens: {
      colors: {
        brand: {
          50: {
            value: '#f5fee5'
          },
          100: {
            value: '#e1fbb2'
          },
          200: {
            value: '#cdf781'
          },
          300: {
            value: '#b8ee56'
          },
          400: {
            value: '#a2e032'
          },
          500: {
            value: '#8ac919'
          },
          600: {
            value: '#71ab09'
          },
          700: {
            value: '#578602'
          },
          800: {
            value: '#3c5e00'
          },
          900: {
            value: '#203300'
          },
        }
      },
      fonts: {
        heading: {
          value: `Montserrat`,
        },
        body: {
          value: `Inter`
        }
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.100}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  }
});