import { computed, ref } from "vue"
import { computedWithControl } from "."


describe('computedWithControl', () => {
  it('should work', () => {
    const trigger = ref(0)
    const data = ref('foo')

    const computed = computedWithControl(trigger, () => data.value.toUpperCase())

    expect(computed.value).toBe('FOO')

    data.value = 'bar'

    expect(computed.value).toBe('FOO')

    trigger.value += 1

    expect(computed.value).toBe('BAR')
  })

  
//   it('getter and setter', () => {
//     const trigger = ref(0)
//     const data = ref('foo')

//     const computed = computedWithControl(trigger, {
//       get() {
//         return data.value.toUpperCase()
//       },
//       set(v) {
//         data.value = v
//       },
//     })

//     expect(computed.value).toBe('FOO')

//     data.value = 'bar'

//     expect(computed.value).toBe('FOO')

//     trigger.value += 1

//     expect(computed.value).toBe('BAR')

//     computed.value = 'BAZ'

//     expect(data.value).toBe('BAZ')
//   })
})
