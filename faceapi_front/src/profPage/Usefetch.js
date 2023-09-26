import { useEffect, useState } from "react";

function Usefetch(url, config) {
    const [data, setdata] = useState(null);
    const [isPending, setisPending] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            fetch(url, config)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setdata(data);
                    console.log(data)
                    setisPending(false)
                })
        }, 1000);

    }, [url])
    return { data, isPending }
}

export default Usefetch
