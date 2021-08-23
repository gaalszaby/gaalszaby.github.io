const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// show new quote
function newQuote() {
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');        
    }
    quoteText.textContent = quote.text;
}

// get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
       const response = await fetch(apiUrl); 
       apiQuotes = await response.json();
       newQuote();
       //console.log(apiQuotes[12]);
    } catch (error) {
        // catch error here
    }
}

// Tweet a quote
function TweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', TweetQuote);

// On Load
getQuotes();