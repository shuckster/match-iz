export type TPredicate<Input> = (value: Input) => boolean
export type TPredicateAsserting<Kind> = (value: unknown) => value is Kind
