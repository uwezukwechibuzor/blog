// x/blog/handler_post.go
package blog

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/example/blog/x/blog/keeper"
	"github.com/example/blog/x/blog/types"
)

func handleMsgCreateComment(ctx sdk.Context, k keeper.Keeper, msg *types.MsgCreateComment) (*sdk.Result, error) {
	k.CreateComment(ctx, *msg)

	return &sdk.Result{Events: ctx.EventManager().ABCIEvents()}, nil
}
