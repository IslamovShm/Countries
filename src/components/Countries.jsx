import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Response wasn't ok ");
                }
                const countries = await response.json();
                setCountries(countries);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountryData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <section className="wrapper">
            {countries.map((country) => (
                <article key={country.name.common}>
                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                    <div className="country__inf">
                        <h3>{country.name.common}</h3>
                        <h4>Capital: <span>{country.capital}</span></h4>
                        <h4>Population: <span>{country.population.toLocaleString()}</span></h4>
                        <Link to={`/countries/${country.name.common}`}>
                            Learn more
                        </Link>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default Countries;
