import { Input } from '@chakra-ui/input'

export default function Input1({ placeholder, value, onChange, isDisabled }) {
	return (
		<Input margin='10px 5px'
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			isDisabled={isDisabled}
		/>
	)
}