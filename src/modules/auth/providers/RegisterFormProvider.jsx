import { createContext, useContext, useReducer } from 'react';

const RegFormContext = createContext();

export const useRegisterFormContext = () => {
	return useContext(RegFormContext);
};

const reducer = (state, action) => {
	// En al action viene {type = que es? , data = informacion que viene }
	switch (action.type) {
		case 'SET_COMMON_DATA': {
			return { ...state, common: { ...action.data } };
		}
		case 'SET_PERSONAL_DATA': {
			return { ...state, personal: { ...action.data } };
		}
		case 'CHANGE_PERCENT': {
			return { ...state, percet: action.data };
		}
	}
	return state;
};

const RegisterFormProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, { percet: 0 });
	return <RegFormContext.Provider value={[state, dispatch]}>{children}</RegFormContext.Provider>;
};

export { RegisterFormProvider };
