

export const getPropSafe =(obj,field,prop1,prop2) => {
	if (obj[field] instanceof Object){
		if (typeof(prop2)==='undefined'){
			return obj[field][prop1];		
		} else {
			return obj[field][prop1][prop2];		
		}
	} else {
		return 'Upon request';			
	}
};
