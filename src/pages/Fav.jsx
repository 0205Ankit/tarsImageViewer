import { useSelector } from 'react-redux';
import Header from '../components/Header'
import useRandomImage from '../hooks/useRandomImage'
import Loader from '../components/Loader';
import ImageContainer from '../components/ImageContainer';

const FavPage = () => {
	const { imageUrl, isLoading, error } = useRandomImage()
  const {favorites} = useSelector(state => state.currentUser.data)

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{!error ? (
						<>
							<div
								className='min-h-screen min-w-sreen bg-no-repeat pt-10'
								style={{
									backgroundImage: `url(${
										imageUrl ? imageUrl : '/background.jpeg'
									})`,
									backgroundSize: 'cover',
								}}>
								<Header title="Favourites"/>
								<h1 className='text-7xl max-md:text-5xl mt-20 text-white w-[60%] mx-auto font-semibold text-center'>
									Discover over 2,000,000 free stock Images
								</h1>

								<div
									className='header w-[20%] mx-auto max-md:w-[60%] max-md:text-sm text-white px-3 py-1 border-[1px]
                                     border-white rounded-md tracking-[0.5px] relative backdrop-blur-lg mt-5 font-sm'>
									<p className='font-semibold'>
										Trending:{' '}
										<span className='font-normal'>
											flowers,love,forest,river
										</span>
									</p>
								</div>
							</div>
						</>
					) : (
						<div
							className='min-h-screen min-w-sreen bg-no-repeat pt-10'
							style={{
								backgroundImage: `url(${
									imageUrl ? imageUrl : '/background.jpeg'
								})`,
								backgroundSize: 'cover',
							}}>
							<Header />
							<h1 className='text-7xl mt-20 text-white w-[60%] mx-auto font-semibold text-center'>
								Can't fetch Images
							</h1>
						</div>
					)}
          <>
											{ (favorites && favorites[0]?.length > 0) ? (
												<div>
                                                    <div className='py-10 bg-slate-100 text-center text-3xl font-semibold'>
                                                        Your favorite Images
                                                    </div>
													<ImageContainer data={favorites[0]} />
												</div>
											) : (
												<h2
													className='text-center text-3xl font-semibold py-10'>
													No favourite Images
												</h2>
											)}
										</>
				</>
			)}
		</>
	)
}

export default FavPage
