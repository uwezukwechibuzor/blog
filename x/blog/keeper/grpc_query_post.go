// x/block/keeper/grpc_query_post.go
package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/example/blog/x/blog/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) PostAll(c context.Context, req *types.QueryAllPostRequest) (*types.QueryAllPostResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var posts []*types.Post
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	postStore := prefix.NewStore(store, types.KeyPrefix(types.PostKey))

	pageRes, err := query.Paginate(postStore, req.Pagination, func(key []byte, value []byte) error {
		var post types.Post
		if err := k.cdc.Unmarshal(value, &post); err != nil {
			return err
		}

		posts = append(posts, &post)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllPostResponse{Post: posts, Pagination: pageRes}, nil
}

func (k Keeper) Post(c context.Context, req *types.QueryGetPostRequest) (*types.QueryGetPostResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
    //fetching post data
	var post types.Post
	ctx := sdk.UnwrapSDKContext(c)
	store_ := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PostKey))
	k.cdc.MustUnmarshal(store_.Get(types.KeyPrefix(types.PostKey+req.Id)), &post)

	//when a post is queried it will have corresponding comments
	var comments []*types.Comment
	store := ctx.KVStore(k.storeKey)
	commentStore := prefix.NewStore(store, types.KeyPrefix(types.CommentKey))
	
	pageRes, err := query.Paginate(commentStore, req.Pagination, func(key []byte, value []byte) error {
		var comment types.Comment

		if err := k.cdc.Unmarshal(value, &comment); err != nil {
			return err
		}
        //return only comments where post id equals comment postId
		if post.Id == comment.PostID {
		comments = append(comments, &comment)
	    }
		return nil
		
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryGetPostResponse{Post: &post,Comment: comments, Pagination: pageRes}, nil
}
