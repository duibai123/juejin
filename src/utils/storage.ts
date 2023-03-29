const getStorage = (name :string) => {
	const sessionStorageData = sessionStorage.getItem(name)
	if(sessionStorageData){
		return JSON.parse(sessionStorageData);
	}
	return null
}

const setStorage = (name:string, data:object) => {
	const stringifyData = JSON.stringify(data)
	sessionStorage.setItem(name, stringifyData)
}

export {
	getStorage,
	setStorage
}
