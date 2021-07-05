// ! 2.0.38 typescript созд клон analytics
// import * as $ from 'jquery'

// ! 2.0.38 синтакс TS (вернуть object)
function createAnalytics2TS(): object {
  let counter = 0
  // ! 2.0.38 синтакс TS (возвращ boolean)
  let destroyed: boolean = false
// ! 2.0.38 синтакс TS (возвращ number)
  const listener = (): number => counter++

  $(document).on('click', listener)

  return {
    destroy() {
      $(document).off('click', listener)
      destroyed = true
    },

    getClicks() {
      if (destroyed) {
        return `Analytics2TS is destroyed. TypeScript. Total clicks = ${counter}`
      }
      return counter
    }
  }
}
// ! 2.0.38 синтакс TS (в скобки и ковычки)
window['analytics'] = createAnalytics2TS()
