import { Card } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import SearchCard from '../components/SearchCard';
import getColor from '../functions/getColor';
import isSearchResult from '../functions/isSearchResult';
import UPDATE_SEARCH_HISTROY from '../reducers/UPDATE_SEARCH_HISTORY';

const SearchPage = (props) => {


  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();


  const makeSearch = async () => {
    
    let catcher = [];

    await props.departmentsRef.doc('appliances').collection('products').get().then(snap => {
      snap.forEach(doc => {

        let searchResult = isSearchResult(doc.data().title, id);

        if (searchResult.pass) {
          catcher.push({
            department: 'appliances',
            product: doc.data().title,
            score: searchResult.score,
            maxScore: searchResult.maxScore,
          });
        }
      })
    });
    await props.departmentsRef.doc('clothing').collection('products').get().then(snap => {
      snap.forEach(doc => {

        let searchResult = isSearchResult(doc.data().title, id);

        if (searchResult.pass) {
          catcher.push({
            department: 'clothing',
            product: doc.data().title,
            score: searchResult.score,
            maxScore: searchResult.maxScore,
          });
        }
      })
    });
    await props.departmentsRef.doc('electronics').collection('products').get().then(snap => {
      snap.forEach(doc => {

        let searchResult = isSearchResult(doc.data().title, id);

        if (searchResult.pass) {
          catcher.push({
            department: 'electronics',
            product: doc.data().title,
            score: searchResult.score,
            maxScore: searchResult.maxScore,
          });
        }
      })
    });
    await props.departmentsRef.doc('furniture').collection('products').get().then(snap => {
      snap.forEach(doc => {

        let searchResult = isSearchResult(doc.data().title, id);

        if (searchResult.pass) {
          catcher.push({
            department: 'furniture',
            product: doc.data().title,
            score: searchResult.score,
            maxScore: searchResult.maxScore,
          });
        }
      })
    });
    await props.departmentsRef.doc('outdoors').collection('products').get().then(snap => {
      snap.forEach(doc => {

        let searchResult = isSearchResult(doc.data().title, id);

        if (searchResult.pass) {
          catcher.push({
            department: 'outdoors',
            product: doc.data().title,
            score: searchResult.score,
            maxScore: searchResult.maxScore,
          });
        }
      })
    });

    const orderedResults = catcher.sort((a, b) => ((b.score / b.maxScore ) * 10) - ((a.score / a.maxScore ) * 10));
    
    setSearchResults(orderedResults);
    if (props.userRef) {

      let orderedIds = [];

      orderedResults.forEach(item => {
        orderedIds.push(item.product)
      })

      await UPDATE_SEARCH_HISTROY(props.userRef, {
        search: id,
        searchTime: new Date(),
        results: orderedIds,
      })
    }
    setLoading(false);
  };

  useEffect(() => {

    makeSearch();

  }, [])

  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border');
  const cardColor = getColor(props.themeSelect, 'card_background');
  const shadowColor = getColor(props.themeSelect, 'box_shadow');

  const viewInStore = (dep) => {
    
    props.viewInStore(dep)
    navigate('/');
    
  };



  return (
    <div className='page'>
      { loading ? <Loading /> :
      <>
        <Button
          href={'/'}
          variant='contained'
          color='primary'
          sx={{
            position: 'fixed',
            left: '5vw',
            top: '0.5vh',
          }}
        >
          Return to Home
        </Button>
        <Typography
          align='center'
          variant='h3'
          sx={{
            color: textColor,
            paddingTop: '2.5vh',
          }}
        >
          Search Results for: {id}
        </Typography>
        <div>
          { searchResults.length === 0 ?
          <Typography
            align='center'
            variant='h5'
            sx={{
              color: textColor,
              marginTop: '3vh',
            }}
          >
            Your search did not return any results. Please try another term.
          </Typography>
          :
          <ul
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '70vw',
              position: 'fixed',
              left: '15vw',
              top: '35vh',
              height: '50vh',
              overflowY: 'scroll',
            }}
          >
            {searchResults.map(item => (
              <SearchCard
                item={item}
                themeSelect={props.themeSelect}
                viewInStore={(dep) => viewInStore(dep)}
              /> 
            ))}
          </ul>
          }
        </div>
      </>
      }
    </div>
  )
}

export default SearchPage