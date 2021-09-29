import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography
} from '@mui/material'
import React from 'react'
import api from '../../services/api'

const Search: React.FC = () => {
  const search = 'search'
  const [appState, setAppState] = React.useState({
    search: '',
    posts: [] as any
  })

  React.useEffect(() => {
    api.get(search + '/' + window.location.search).then(res => {
      const allPosts = res.data
      setAppState({ ...appState, posts: allPosts })
      console.log(res.data)
    })
  }, [setAppState])

  return (
    <>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {appState.posts.map((post: any) => {
            return (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={post.id} xs={12} md={4}>
                <Card>
                  <Link color="textPrimary" href={'/post/' + post.slug}>
                    <CardMedia
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {post.name.substr(0, 50)}...
                    </Typography>
                    <div>
                      <Typography color="textSecondary">
                        {post.description.substr(0, 40)}...
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default Search
