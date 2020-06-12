interface Story {
    "id":string,
    "author":string,
    "description":string,
    "full_story":string
}

let stories: Story[] = 
[
    {
        "id": "randomlee",
        "author": "Folorunso Daniel",
        "description": "Story of My Life",
        "full_story":"To be discussed later"
    },
    {
        "id": "michey",
        "author": "Folorunso Grace",
        "description": "Story of My School",
        "full_story":"To be discussed now"
    },
    {
        "id": "oyenike",
        "author": "Folorunso Favour",
        "description": "Story of My WAEC",
        "full_story":"To be discussed in 2 minutes"
    },
]

const allStories = ({response}:{response:any}) => {
  
    if(stories)
    {
    response.status = 200
    response.body = {
        success: true,
        data: stories
    }
    }
    else
    {
      response.status = 404
      response.body = {
          success: false,
          msg: "No Stories Found"
      }
    }
}

const oneStory = ({params, response}:{params: {"id":string}, response: any}) =>
{
    const story: Story | undefined = stories.find((p) => p.id === params.id)

    if(story)
    {
        response.status = 200
        response.body = {
            success: true,
            data: story
        }
    }
    else
    {
        response.status = 404
        response.body = {
            success: false,
            msg: "Story Not Found"
        }
    }
}

const addStory = async ({request, response}:{request: any, response: any}) =>
{

    if(!request.hasBody)
    {
        response.status = 400
        response.body = {
            success: false,
            msg: "Story Not Created"
        }
    }
    else
    {
        const body = await request.body()
        stories.push(body.value)
        response.status = 201
        response.body = {
            success: true,
            data: stories
        }
    }
}

const updateStory = async ({params, request, response}:{params:{"id": string}, request:any, response:any}) =>
{
    const story: Story | undefined = stories.find((p) => p.id === params.id)

    if(story)
    {
        const body = await request.body()
        const updatedStory: {"author"?:string,"description"?:string,"full_story"?:string} = body.value;
        stories = stories.map(p => p.id === params.id ? {...p, ...updatedStory} : p)
        response.status = 200
        response.body = {
            success: true,
            data: stories
        }
    }
    else if(!request.hasBody)
    {
        response.status = 400
        response.body = {
            success: false,
            msg: "No Body To Be Updated"
        }
    }
    else
    {
        response.status = 404
        response.body = {
            success: false,
            msg: "No Story To Be Updated"
        }
    }
}

const deleteStory = ({params, response}:{params:{"id":string}, response: any}) =>
{
    const story: Story | undefined = stories.find(p => p.id === params.id)

    if(story)
    {
        stories = stories.filter(p => p.id !== params.id)
        response.status = 200
        response.body = {
            success: true,
            data: stories
        }
    }
    else
    {
        response.status = 404
        response.body = {
            success: false,
            msg: "Story Not Found"
        }
    }
}

export {allStories, oneStory, addStory, updateStory, deleteStory} 