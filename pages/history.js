import React, { useState, useEffect } from 'react';

const History = () => {
	const [weatherHistory, setWeatherHistory] = useState([]);

	// useEffect checks if localStorage.weatherHistory exists
	useEffect(() => {
		// console.log(
		// 	'get local storage weather history =>',
		// 	localStorage.weatherHistory
		// );
		setWeatherHistory(
			localStorage.weatherHistory !== undefined
				? JSON.parse(localStorage.weatherHistory)
				: []
		);
	}, []);

	return (
		<div className='flex justify-center content-center p-3 min-h-screen bg-[#4f32ff]'>
			<div>
				<h2 className='mt-5 text-white text-center'>
					{' '}
					My Weather History
				</h2>
				<div className='mt-5'>
					{weatherHistory.length > 0 ? (
						weatherHistory.map((weather, idx) => {
							return (
								<div
									key={idx}
									className='max-w-sm rounded overflow-hidden shadow-lg bg-white mt-3'>
									<div className='px-6 py-4'>
										<div className='font-bold text-xl mb-2'>
											{weather.city}: {weather.date}
										</div>
										<small>{weather.time}</small>
										<hr />
										<p className='text-gray-700 text-base'>
											<span className='font-bold'>
												Temperature:{' '}
											</span>
											{weather.temperature}
											<sup>°C</sup>
										</p>
										<p className='text-gray-700 text-base'>
											<span className='font-bold'>
												Condition:{' '}
											</span>
											{weather.description}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<p>Nothing to see here - yet</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default History;
