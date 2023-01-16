class nTextGroup extends nElement {
  label = new nElement
  input = new nInputText
  error = new nError

  constructor() {
    super({ component: { name: 'text-group' } })

    this.append(this.label)
    this.append(this.input)
    this.append(this.error)
  }
}
