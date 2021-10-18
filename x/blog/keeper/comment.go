package keeper

import (
	"strconv"

	 "github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/example/blog/x/blog/types"
)

// GetCommentCount get the total number of comment
func (k Keeper) GetCommentCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentCountKey))
	byteKey := types.KeyPrefix(types.CommentCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	count, err := strconv.ParseUint(string(bz), 10, 64)
	if err != nil {
		// Panic because the count should be always formattable to int64
		panic("cannot decode count")
	}

	return count
}

// SetCommentCount set the total number of comment
func (k Keeper) SetCommentCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentCountKey))
	byteKey := types.KeyPrefix(types.CommentCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
	store.Set(byteKey, bz)
}

func (k Keeper) CreateComment(ctx sdk.Context, msg types.MsgCreateComment) {
	// Create the comment
	count := k.GetCommentCount(ctx)
	var comment = types.Comment{
		Creator: msg.Creator,
		Id:      strconv.FormatUint(count, 10),
		Body:    msg.Body,
		PostID:  msg.PostID,
	}

	//blogPostOwner cannot comment on his/her post
	blogPostOwner := k.GetPostOwner(ctx, msg.PostID)
	if blogPostOwner == comment.Creator{
		panic("You can not comment on the blog post")
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentKey))
	key := types.KeyPrefix(types.CommentKey + comment.Id)
	value := k.cdc.MustMarshal(&comment)
	store.Set(key, value)

	// Update comment count
	k.SetCommentCount(ctx, count+1)
}

func (k Keeper) GetComment(ctx sdk.Context, key string) types.Comment {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentKey))
	var comment types.Comment
	k.cdc.MustUnmarshal(store.Get(types.KeyPrefix(types.CommentKey+key)), &comment)
	return comment
}

func (k Keeper) HasComment(ctx sdk.Context, id string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentKey))
	return store.Has(types.KeyPrefix(types.CommentKey + id))
}

func (k Keeper) GetCommentOwner(ctx sdk.Context, key string) string {
	return k.GetComment(ctx, key).Creator
}

func (k Keeper) GetAllComment(ctx sdk.Context) (msgs []types.Comment) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentKey))
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(types.CommentKey))

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var msg types.Comment
		k.cdc.MustUnmarshal(iterator.Value(), &msg)
		msgs = append(msgs, msg)
	}

	return
}
