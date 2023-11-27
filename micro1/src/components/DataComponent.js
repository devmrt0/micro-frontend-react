import {useQuery} from 'react-query';
export const DataComponent = () => {
	
	const getFacts = async () => {
		const res = await fetch('https://meowfacts.herokuapp.com/');
        return res.json();
	};
	
	const {data, error, isLoading} = useQuery('randomFacts', getFacts);
	
	if (error) return <div>Request Failed</div>;
	if (isLoading) return <div>Loading...</div>;
	if(data)
	return (
		<div>
			<h1>Random Fact:</h1>
			{<p>{data.data[0]}</p>}
		</div>
	);
}

