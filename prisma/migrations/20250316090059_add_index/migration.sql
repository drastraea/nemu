-- CreateIndex
CREATE INDEX "Image_itemId_idx" ON "Image"("itemId");

-- CreateIndex
CREATE INDEX "Item_type_category_timeframe_idx" ON "Item"("type", "category", "timeframe");

-- CreateIndex
CREATE INDEX "ItemTag_itemId_tagId_idx" ON "ItemTag"("itemId", "tagId");

-- CreateIndex
CREATE INDEX "Match_lostItemId_foundItemId_status_idx" ON "Match"("lostItemId", "foundItemId", "status");

-- CreateIndex
CREATE INDEX "Notification_userId_matchId_type_idx" ON "Notification"("userId", "matchId", "type");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
