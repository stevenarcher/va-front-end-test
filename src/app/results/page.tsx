import { Suspense } from 'react';
import SearchResultsComponent from '../components/search-results/search-results.component'
import Loading from './loading';
import {SearchParams} from "@/types/booking";

type ResultsProps = {
  searchParams: SearchParams
}
export default function Results({ searchParams }: ResultsProps) {
  return (
    <>
      <h1>Search results</h1>

      <Suspense fallback={<Loading />}>
        <SearchResultsComponent searchParams={searchParams} />
      </Suspense>
    </>
  )
}
