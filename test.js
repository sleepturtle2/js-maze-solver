let count = 10;


var handle = setInterval(() => {
        console.log(count);
        count--;
        if (count == 0)
            clearInterval(handle);
    },
    100);