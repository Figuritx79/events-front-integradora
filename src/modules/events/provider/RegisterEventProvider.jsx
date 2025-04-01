import { createContext, useContext, useReducer } from 'react';

const RegisterEventContext = createContext();

export const useRegisterEvent = () => {
	return useContext(RegisterEventContext);
};

const reducer = (state, action) => {
	// En al action viene {type = que es? , data = informacion que viene }
	switch (action.type) {
		case 'SET_PERSONAL_DATA': {
			return { ...state, personal: { ...action.data } };
		}
		case 'SET_COMMON_DATA': {
			return { ...state, common: { ...action.data } };
		}
		case 'SET_FINAL_DATA': {
			return { ...state, final: { ...action.data } };
		}
		case 'CHANGE_PERCENT': {
			return { ...state, percet: action.data };
		}
		case 'SET_ID_EVENT': {
			return { ...state, id: action.data };
		}
	}
	return state;
};

const RegisterEventProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, { percet: 0 });
	return <RegisterEventContext.Provider value={[state, dispatch]}>{children}</RegisterEventContext.Provider>;
};

export { RegisterEventProvider };
