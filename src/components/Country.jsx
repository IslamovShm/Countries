import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../country.css"

const Country = () => {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/name/${name}`
                );
                if (!response.ok) {
                    throw new Error("Response wasn't ok");
                }
                const country = await response.json();
                if (country.status === 404) {
                    throw new Error('Country not found');
                }
                setCountry(country);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountryData();
    }, [name]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <Link to="/" className="link__back">Back Home</Link>
            </div>
        );
    }

    return (
        <>
            <section className="country">
                <Link to="/" className="link__back">
                    Back Home
                </Link>
                {country.map((data) => (
                    <article key={data.name.common}>
                        <div className="country-inner">
                            <div className="flag">
                                <img src={data.flags.png} alt={name} />
                            </div>

                            <div className="country-details">
                                <div>
                                    <h2>{data.name.common}</h2>
                                    <h5>
                                        Population: <span>{data.population.toLocaleString()}</span>
                                    </h5>
                                    <h5>
                                        Region: <span>{data.region}</span>
                                    </h5>
                                    <h5>
                                        Capital: <span>{data.capital}</span>{" "}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};

export default Country;
