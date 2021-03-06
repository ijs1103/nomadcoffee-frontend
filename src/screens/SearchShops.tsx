import { gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import ContentLayOut from "../components/ContentLayOut";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import NotFound from "../components/NotFound";
import {useState, useEffect} from "react";

const SearchResults = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
    border-bottom: solid 1px gray;
`;
const Text = styled.h1`
    font-size: 40px;
    color: white;
`;
const LoadMoreDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const LoadMoreBtn = styled(Button)`
    margin-top: 10px;
    font-size: 25px;
    height: 50px;
    width: 150px;
`;
const SEARCH_QUERY = gql`
    query searchShops($offset: Int!, $limit: Int!, $keyword: String!){
        searchShops(offset: $offset, limit: $limit, keyword: $keyword){
            id
            name
            address
            user{
                username
            }
            categories{
                name
            }
            photos{
                url
            }
            isLiked
            likes
            commentNumber
            comments{
                id
                user {
                    username
                }
                payload
                isMine
                createdAt
            }
        }
    }
`;
const LIMIT = 5;
const SearchShops = () => {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { keyword } = useParams<{keyword: string}>();
    const {data, loading, refetch, fetchMore} = useQuery(SEARCH_QUERY, {variables: {offset: 0, limit: LIMIT, keyword}});
    const handleLoadMore = () => {
        const currentLength = data?.searchShops?.length;
        fetchMore({
            variables: {
                offset: currentLength,  
                limit: LIMIT,
                keyword
            }
        }).then(
            (fetchMoreResult: any) => {
                const totalLength  = currentLength+fetchMoreResult?.data?.searchShops?.length;
                // ??????????????? ?????? ??????????????? ????????? ?????? ?????????
                if(totalLength===currentLength) setBtnDisabled(true);
            }
        );
    };
    useEffect(() => { 
        // ???????????? ???????????? ???????????? refetch??? ????????? ????????? variables??? ????????? query??? ????????????.
        refetch();
    }, [refetch, keyword]);
    
    return(
        <ContentLayOut title="?????? ??????">
            <SearchResults>
                <Text>
                    "{keyword}" (???)??? ????????? ??????
                </Text>
            </SearchResults>
            {data?.searchShops?.length===0 && <NotFound />}
            {data?.searchShops?.map((shop: any) => <Card key={shop.id} {...shop} />)}
            {data?.searchShops?.length>=LIMIT && <LoadMoreDiv><LoadMoreBtn disabled={btnDisabled} onClick={handleLoadMore} value="?????????" readOnly/></LoadMoreDiv>}
            {loading && <Loader />}
        </ContentLayOut>
    );
};
export default SearchShops;