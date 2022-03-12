import Link from 'next/link';
import Image from 'next/image';
import { axiosInstance1 } from '../Utils/API';
import { axiosInstance2 } from '../Utils/API';

// using getServerSideProps() to fetch data
//from external API and display
//information once page loads
export const getServerSideProps = async () => {
	// fetching ip data from external API//
	const ipRequest = await axiosInstance1(`/json`);
	const ipData = ipRequest.data;

	// this assigns the region name/city/state
	//of the country where my internet IP is located//
	const city = ipData.regionName;
	const countryCode = ipData.countryCode;

	// fetching data from external API//
	// const ipRequest = await fetch(`http://ip-api.com/json/`);
	// const ipData = await ipRequest.json();

	// this retrieves the region name/city/state
	//of the country where my internet IP is located//
	// const city = ipData.regionName;
	// const countryCode = ipData.countryCode;

	// inputing my API key from the weather api app stored in .env.local or next.config.js//
	const weatherApi_Key = process.env.WEATHER_API_KEY;

	// passing "city" and "weatherApi_key" variables into the "weatherUrl",
	//"weatherURL" is the url link of the weather API//
	const weatherURL = `/data/2.5/weather?q=${city},&appid=${weatherApi_Key}&units=metric`;
	const weatherRequest = await axiosInstance2(weatherURL);
	const weatherInfo = weatherRequest.data;

	console.log('weather info =>', weatherInfo);

	// passing "city" and "weatherApi_key" variables into the "weatherUrl",
	//"weatherURL" is the url link of the weather API//
	// const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${weatherApi_Key}&units=metric`;
	// const weatherRequest = await fetch(weatherURL);
	// const weatherInfo = await weatherRequest.json();

	return {
		props: {
			weatherInfo,
			city,
			countryCode,
		},
	};
};

//----------------------------------------------------------------------------------------------------------->

// Pass weatherInfo and city props into the Home component//
export default function Home({ weatherInfo, city, countryCode }) {
	const date = new Date();
	// To load our images/icons from our weather app api url
	const myLoader = ({ src }) => {
		// "src" is gotten from Image component below//
		return `https://openweathermap.org/img/w/${src}.png`;
	};

	// saveweather is our function to save current weather information into
	// localStorage
	const saveWeather = () => {
		// would serve as current date when any data is saved to localStorage
		const date = new Date();

		// "data" is the information we are storing in localStorage
		// we are storing it in an "object" format
		let data = {
			date: `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`,
			time: date.toLocaleTimeString(),
			city: city,
			temperature: weatherInfo.main.temp,
			description: weatherInfo.weather[0].description,
		};

		// getItem retrieves data from localStorage and parses
		let previousData = localStorage.getItem('weatherHistory');
		previousData = JSON.parse(previousData);

		//if there's no data in localStorage, display an empty array//
		// else display the data in an array of objects
		if (previousData === null) {
			previousData = [];
		}
		previousData.push(data);

		// setItem stores the data in localStorage
		// must be converted to a string befor storing it
		// localStorage can only store strings
		localStorage.setItem('weatherHistory', JSON.stringify(previousData));
		console.log('weather saved successfully', previousData);
	};

	const getFullDate = `${date.getDate()}-${
		date.getMonth() + 1
	}-${date.getFullYear()}`;

	return (
		<div className='bg-[#4f32ff]'>
			<div className='flex justify-center content-center min-h-screen'>
				<div>
					<div className='text-white'>
						<h1 className='font-extrabold text-6xl text-white'>
							{city}, {countryCode}
						</h1>
						{getFullDate}
					</div>
					<div className='flex justify-between content-center mt-4'>
						<div className='pr-5'>
							<h2 className='inline-flex text-white'>
								{weatherInfo.main.temp}
							</h2>
							<sup className='text-white'>°C</sup>
							<p className='text-cyan-600'>
								{weatherInfo.weather[0].description}
							</p>
						</div>
						<div>
							<Image
								loader={myLoader}
								src={weatherInfo.weather[0].icon}
								alt='weather icon'
								width={50}
								height={50}
							/>
						</div>
					</div>
					<hr />
					<div className='md:flex justify-between content-center mt-4'>
						<button
							onClick={saveWeather}
							className='bg-green-600 border-0 px-4 py-3 rounded-md text-white hover:shadow-lg'>
							Timestamp
						</button>
						<Link href='/history' passHref>
							<button className='bg-red-600 border-0 px-4 py-3 ml-auto rounded-md text-white hover:shadow-lg'>
								My History
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
